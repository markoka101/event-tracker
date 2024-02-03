package eventTracker.service;

import eventTracker.entity.Events;
import eventTracker.repository.EventsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

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

    //create event
    @Override
    public Events saveEvent(Events events) {
        return eventsRepository.save(events);
    }

    //delete event
    @Override
    public void deleteEvent(Long id) {
        entityManager.remove(getEvent(id));
    }

    //update completion status for expired events
    @Override
    public void updateAllEvents() {
        List<Events> allEvents = getAllEvents();
        Date currentDateTime = new Date();

        for (Events events : allEvents) {
            if (events.getDate().before(currentDateTime)) {
                events.setCompleted(true);
                eventsRepository.save(events);
            }
        }
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
