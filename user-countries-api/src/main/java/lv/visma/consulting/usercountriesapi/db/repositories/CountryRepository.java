package lv.visma.consulting.usercountriesapi.db.repositories;

import lv.visma.consulting.usercountriesapi.db.entities.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<CountryEntity, Long> {
}
