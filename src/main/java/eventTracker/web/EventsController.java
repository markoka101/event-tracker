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
    @GetMapping("/all")
    public ResponseEntity<?> displayAllEvents() {
        return new ResponseEntity<>(eventsService.getAllEvents(),HttpStatus.OK);
    }

    //edit event
    @RolesAllowed({"ROLE_USER","ROLE_ADMIN"})
    @PutMapping("/{id}/edit")
    public ResponseEntity<?> editEvent(@PathVariable Long id, @Valid @RequestBody Events editEvent, Principal p) {
        //check if user is the creator of the event
        if (!eventsService.creator(p.getName().toString(),id)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        eventsService.editEvent(id, editEvent);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //delete event
    @Transactional
    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN"})
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id, Principal p) {
        //check if user is creator of event
        if(!eventsService.creator(p.getName().toString(),id)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        eventsService.deleteEvent(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
