package eventTracker.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import eventTracker.pojo.Address;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name="EVENTS")
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

    @NonNull
    @Column
    private Address address;

    @NonNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    @Column
    private Date date;

    @NonNull
    @Column
    private Boolean completed;

    @NotBlank(message = "Event Contact cannot be blank")
    @NonNull
    private String contact;

    @JsonIgnore
    @NonNull
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonIgnore
    @ManyToMany(mappedBy="savedEvents")
    private Set<User> usersSaved;
}
