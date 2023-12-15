package eventTracker.service;

import eventTracker.entity.Events;
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

    //edit event
    @Override
    public void editEvent(Long id, Events events) {

    }

    @Override
    public void deleteEvent(Long id) {

    }

    static Events unwrapEvent(Optional<Events> entity) {
        if (entity.isPresent()) {
            return entity.get();
        } else {
            throw new EntityNotFoundException();
        }
    }
}
