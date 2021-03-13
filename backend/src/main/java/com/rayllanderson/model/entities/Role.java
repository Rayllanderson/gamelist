package com.rayllanderson.model.entities;

import com.rayllanderson.model.entities.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity(name = "roles")
public class Role implements GrantedAuthority {

    @EqualsAndHashCode.Include
    @Enumerated(EnumType.STRING)
    @Id
    @Column(name = "name")
    private RoleType roleName;

    @Override
    public String getAuthority() {
        return roleName.toString();
    }
}
