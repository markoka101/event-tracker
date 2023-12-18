package eventTracker.service;

import eventTracker.entity.Events;
import eventTracker.entity.User;
import eventTracker.repository.EventsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EventsServiceImpl implements EventsService {
    private EventsRepository eventsRepository;
    private EntityManager entityManager;

    /*
    Get events
     */
    //get event by id
    @Override
    public Events getEvent(Long id) {
        return unwrapEvent(eventsRepository.findById(id));
    }

    //get event by name
    @Override
    public Events getEvent(String name) {
        return unwrapEvent(eventsRepository.findByName(name));
    }

    //get all events
    @Override
    public List<Events> getAllEvents() {
        return eventsRepository.findAll();
    }

    //check if user is creator of event
    @Override
    public Boolean creator(String username, Long id) {
        User user = getEvent(id).getUser();
        return username.equals(user.getUsername());
    }

    //edit event
    @Override
    public void editEvent(Long id, Events editEvents) {
        editEvents.setId(id);
        eventsRepository.save(editEvents);
    }

    //delete event
    @Override
    public void deleteEvent(Long id) {
        entityManager.remove(getEvent(id));
    }

    //unwrap event
    static Events unwrapEvent(Optional<Events> entity) {
        if (entity.isPresent()) {
            return entity.get();
        } else {
            throw new EntityNotFoundException();
        }
    }
}
