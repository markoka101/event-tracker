package eventTracker;

import eventTracker.entity.Role;
import eventTracker.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@SpringBootApplication
@AllArgsConstructor
public class EventTrackerApplication implements CommandLineRunner {

	RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(EventTrackerApplication.class, args);
	}

	@Override
	public void run(String...  args) throws Exception {
		Role admin = new Role("ROLE_ADMIN");
		Role user = new Role("ROLE_USER");

		roleRepository.saveAll(List.of(admin,user));
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
