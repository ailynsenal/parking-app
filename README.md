#Acceptance Criteria

1. There are initially three (3) entry points, and there can be no less than three (3) leading into the parking complex. A vehicle must be assigned a possible and available slot closest to the parking entrance. The mall can decide to add new entrances later.

2. There are three types of vehicles: small (S), medium (M), and large (L), and there are three types of parking slots: small (SP), medium (MP), and large (LP).
(a) S vehicles can park in SP, MP, and LP parking spaces;
(b) M vehicles can park in MP and LP parking spaces; and
(c) L vehicles can park only in LP parking spaces.

3. Your parking system must also handle the calculation of fees, and must meet the following pricing structure:
(a) All types of car pay the flat rate of 40 pesos for the first three (3) hours;
(b) The exceeding hourly rate beyond the initial three (3) hours will be charged as follows:
- 20/hour for vehicles parked in SP;
- 60/hour for vehicles parked in MP; and
- 100/hour for vehicles parked in LP
Take note that exceeding hours are charged depending on parking slot size regardless of vehicle size.
For parking that exceeds 24 hours, every full 24-hour chunk is charged 5,000 pesos regardless of the parking slot.
The remainder hours are charged using the method explained in (b).
Parking fees are calculated using the rounding up method, e.g. 6.4 hours must be rounded to 7.
(c) A vehicle leaving the parking complex and returning within one hour must be charged a continuous rate,
i.e. the vehicle must be considered as if it did not leave. Otherwise, rates must be implemented as described.
