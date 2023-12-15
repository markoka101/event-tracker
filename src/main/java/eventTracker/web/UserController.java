package eventTracker.web;

import eventTracker.entity.Events;
import eventTracker.entity.User;
import eventTracker.pojo.AuthRequest;
import eventTracker.pojo.AuthResponse;
import eventTracker.security.JwtTokenUtil;
import eventTracker.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.security.Principal;

@AllArgsConstructor
@RestController
@CrossOrigin(
        origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JwtTokenUtil jwtTokenUtil;

    /*
    Signup and login
     */
    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody AuthRequest request) {

        //authenticate user credentials
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
            );

            User user = userService.getUser((String)authentication.getPrincipal(), "username");

            //generate token and send back
            String  accessToken = jwtTokenUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getId(),request.getUsername(),accessToken);

            return ResponseEntity.accepted().body(response);
        } catch(BadCredentialsException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /*
    User interactions with events
     */
    @RolesAllowed({"ROLE_USER","ROLE_ADMIN"})
    @PostMapping("/createEvent")
    public ResponseEntity<?> createEvent(@Valid @RequestBody Events event, Principal p) {
        userService.createEvent(event,p.getName().toString());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //create event

}
