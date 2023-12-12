package eventTracker.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name="events")
public class Events {

    @Id
    @GeneratedValue(strategy  = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Event name cannot be blank")
    @NonNull
    @Column
    private String name;

    @NotBlank(message = "Event description cannot be blank")
    @NonNull
    @Column
    private String description;

    @Column
    private String link;

    @NotBlank(message = "Event location cannot be blank")
    @NonNull
    @Column
    private String location;

    @NotBlank(message = "Event time cannot be blank")
    @NonNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    @Column
    private Date date;

    @NonNull
    @Column
    private Boolean completed;

    @NotBlank(message = "Event Contact cannot be blank")
    @NonNull
    @Column
    private String contact;

    @JsonIgnore
    @OneToMany
    @NonNull
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
