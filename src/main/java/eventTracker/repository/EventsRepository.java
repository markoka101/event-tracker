package eventTracker.repository;

import eventTracker.entity.Events;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface EventsRepository extends CrudRepository<Events,Long> {
    Optional<Events> findByName(String name);
    List<Events> findAll();
}
