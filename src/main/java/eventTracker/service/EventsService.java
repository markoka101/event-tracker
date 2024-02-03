package eventTracker.service;

import eventTracker.entity.Events;
import java.util.List;

public interface EventsService {
    //accessing events
    Events getEvent(Long id);
    Events getEvent(String name);
    List<Events> getAllEvents();

    //save event to repo
    Events saveEvent(Events events);

    //deleting events
    void deleteEvent(Long id);

    /*
    checks if current date is past event
    If it is update status to complete
    */
    void updateAllEvents();
}
