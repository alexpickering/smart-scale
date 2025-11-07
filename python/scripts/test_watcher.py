# %%
from watchfiles import watch
from python.tests.conftest import TEST_DATA_PATH

# %%
watched = TEST_DATA_PATH / "watched_files"
print(watched.exists())

# %%
a = watched / "a.txt"
b = watched / "b.txt"
for changes in watch(a, b):
    print(changes)