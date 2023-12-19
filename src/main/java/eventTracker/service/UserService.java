package eventTracker.service;

import eventTracker.entity.Events;
import eventTracker.entity.User;

import java.util.Set;

public interface UserService {
    //accessing user
    User getUser(Long id);
    User getUser(String email, String option);
    void saveUser(User user);

    //user accessing events
    void createEvent(Events event, String username);
    void editEvent(Long id, Events editEvents, String username);
    void deleteEvent(Long id, String username);
    void saveEvent(Long eventId, String username);
    void removeSavedEvent(Long eventId, String username);
    Set<Events> getSavedEvents(String username);
    Set<Events> getCreatedEvents(String username);

    Boolean eventCreator(Long id, String username);

}
