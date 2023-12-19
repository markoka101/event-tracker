package eventTracker.web;

import eventTracker.entity.Events;
import eventTracker.service.EventsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.security.Principal;

@AllArgsConstructor
@RestController
@CrossOrigin(
        origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
@RequestMapping("/events")
public class EventsController {

    private EventsService eventsService;


    /*
    Get and display events
     */
    //display all events
    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<?> displayAllEvents() {
        return new ResponseEntity<>(eventsService.getAllEvents(),HttpStatus.OK);
    }
    //get event by name
    @RolesAllowed({"ROLE_USER","ROLE_ADMIN"})
    @GetMapping("/names")
    @ResponseBody
    public ResponseEntity<?> getEventByName(@RequestParam String name) {
        return new ResponseEntity<>(eventsService.getEvent(name),HttpStatus.OK);
    }
}
