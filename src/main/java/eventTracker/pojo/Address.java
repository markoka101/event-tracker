package eventTracker.pojo;

import lombok.*;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @NonNull
    private String addressLine1;
    private String addressLine2;

    @NonNull
    private String city;
    private String state;

    @NonNull
    private String country;
    private String postalCode;
}
