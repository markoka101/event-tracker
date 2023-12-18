package eventTracker.service;

import eventTracker.entity.Events;
import java.util.List;

public interface EventsService {
    //accessing events
    Events getEvent(Long id);
    Events getEvent(String name);
    List<Events> getAllEvents();

    Boolean creator(String username, Long id);


    void editEvent(Long id, Events editEvents);

    //deleting events
    void deleteEvent(Long id);
}
