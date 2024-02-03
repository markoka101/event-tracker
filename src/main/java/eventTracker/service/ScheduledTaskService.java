package eventTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTaskService {

    @Autowired
    private EventsService eventsService;

    @Scheduled(fixedRate = 120000)
    public void execute() {
        eventsService.updateAllEvents();
    }
}
