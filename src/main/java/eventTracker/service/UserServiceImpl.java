package eventTracker.service;

import eventTracker.entity.Events;
import eventTracker.entity.Role;
import eventTracker.entity.User;
import eventTracker.repository.EventsRepository;
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
    private EventsRepository eventsRepository;

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

    @Override
    public void createEvent(Events events, String username) {
        User user = getUser(username, "username");
        events.setUser(user);
        eventsRepository.save(events);
    }
    //add event to user's saved events
    @Override
    public void saveEvent(Long eventId, Long userId) {
        User user = unwrapUser(userRepository.findById(userId));
        user.getSavedEvents().add(eventsService.getEvent(eventId));
    }

    //remove event from user's saved events
    @Override
    public void removeSavedEvent(Long eventId, Long userId) {
        User user = unwrapUser(userRepository.findById(userId));
        user.getSavedEvents().remove(eventsService.getEvent(eventId));
    }

    //get the user's saved events
    @Override
    public Set<Events> getSavedEvents(Long id) {
        return unwrapUser(userRepository.findById(id)).getSavedEvents();
    }

    //get the user's created events
    @Override
    public Set<Events> getCreatedEvents(Long id) {
        return unwrapUser(userRepository.findById(id)).getCreatedEvents();
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
