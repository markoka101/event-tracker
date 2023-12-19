package eventTracker.service;

import eventTracker.entity.Events;
import eventTracker.entity.Role;
import eventTracker.entity.User;
import eventTracker.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private EventsService eventsService;

    /*
    Getting user
     */

    //get user by id
    @Override
    public User getUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        return unwrapUser(user);
    }

    //get user by email or name
    @Override
    public User getUser(String email, String option) {
        Optional<User> user;
        if(option.equals("email")) {
            user = userRepository.findByEmail(email);
        } else {
            user = userRepository.findByUsername(email);
        }
        return unwrapUser(user);
    }

    //Saving user
    @Override
    public void saveUser(User user) {
        //encode password
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        //set user role
        user.addRole(new Role(2L));
        userRepository.save(user);
    }

    /*
    User accessing events logic
     */
    //create the event
    @Override
    public void createEvent(Events events, String username) {
        //set user for the event and save
        User user = getUser(username,"username");
        events.setUser(user);
        events = eventsService.saveEvent(events);

        //add the saved event to the user's created events set
        user.getCreatedEvents().add(events);
        userRepository.save(user);
    }

    //edit event
    @Override
    public void editEvent(Long id, Events editEvents, String username) {
        //set edited event to the id of the event it will replace
        editEvents.setId(id);
        editEvents.setUser(getUser(username,"username"));
        eventsService.saveEvent(editEvents);
    }

    //delete event
    @Override
    public void deleteEvent(Long id, String username) {
        //remove event from created events
        getUser(username,"username").getCreatedEvents().remove(eventsService.getEvent(id));
        Events events = eventsService.getEvent(id);

        //remove event from all users who saved event
        for (User users : events.getUsersSaved()) {
            users.getSavedEvents().remove(events);
        }

        //delete event
        eventsService.deleteEvent(id);
    }

    //add event to user's saved events
    @Override
    public void saveEvent(Long eventId, String username) {
        User user = unwrapUser(userRepository.findByUsername(username));
        user.getSavedEvents().add(eventsService.getEvent(eventId));
        userRepository.save(user);
    }

    //remove event from user's saved events
    @Override
    public void removeSavedEvent(Long eventId, String username) {
        User user = unwrapUser(userRepository.findByUsername(username));
        user.getSavedEvents().remove(eventsService.getEvent(eventId));
        userRepository.save(user);
    }

    //get the user's saved events
    @Override
    public Set<Events> getSavedEvents(String username) {
        return unwrapUser(userRepository.findByUsername(username)).getSavedEvents();
    }

    //get the user's created events
    @Override
    public Set<Events> getCreatedEvents(String username) {
        return unwrapUser(userRepository.findByUsername(username)).getCreatedEvents();
    }

    //check if user is the creator of a specific event
    @Override
    public Boolean eventCreator(Long id, String username) {
        User user = eventsService.getEvent(id).getUser();
        return username.equals(user.getUsername());
    }

    //unwrap user
    static User unwrapUser(Optional<User> entity) {
        if (entity.isPresent()) {
            return entity.get();
        } else  {
            throw new EntityNotFoundException("User not found");
        }
    }
}
