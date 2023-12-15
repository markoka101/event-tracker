package eventTracker.web;

import eventTracker.service.EventsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
