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
    void saveEvent(Long eventId, Long userId);
    void removeSavedEvent(Long eventId, Long userId);
    Set<Events> getSavedEvents(Long id);
    Set<Events> getCreatedEvents(Long id);

}
