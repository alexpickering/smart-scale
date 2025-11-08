from pathlib import Path

import polars as pl
from pydantic import BaseModel

from smart_scale.app import WeightEntry
from smart_scale.database import get_db

data_path = Path(__file__).parent.parent.parent / "frontend" / "weight_data.csv"

# [ ] try analysis from .csv *first*
# [ ] then, try to pull from database
df = pl.read_csv(data_path.read_text(), has_header=True)

# db = next(get_db())
# df = pl.read_database(query="SELECT * FROM your_table", connection=db)

# df.group_by_dynamic("Date", every="14d").agg(pl.mean("Weight"))
# df.select(pl.col('weight').ewm_mean(span=14))
