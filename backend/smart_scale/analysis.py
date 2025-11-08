from pathlib import Path

import polars as pl
from pydantic import BaseModel

from smart_scale.app import WeightEntry
from smart_scale.database import get_db

# [ ] given weight_entries, analyze them

class RollingAverage(BaseModel):
    value: float
    entry_count: int

    def update(self, new_entry: WeightEntry):
        self.entry_count += 1
        self.value


def create_average(weight_entries: list[WeightEntry], existing_average: RollingAverage | None = None) -> RollingAverage: ...

data_path = Path(__file__).parent.parent.parent / "frontend" / "weight_data.csv"

# df = pl.read_csv(data_path.read_text(), has_header=True)
db = next(get_db())
pl.read_database(query=query, connection=db)
df.group_by_dynamic("Date", every="14d").agg(pl.mean("Weight"))
