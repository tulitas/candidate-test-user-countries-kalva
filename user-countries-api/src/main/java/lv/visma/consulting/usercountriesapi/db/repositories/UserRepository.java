package lv.visma.consulting.usercountriesapi.db.repositories;

import lv.visma.consulting.usercountriesapi.db.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
