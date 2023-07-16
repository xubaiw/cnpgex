from pathlib import Path
from rdflib import Dataset


def main():
    directory = Path(__file__).parent
    dataset = Dataset()
    for p in directory.glob("*.ru"):
        dataset.update(read_text(p))
    for q in dataset:
        print(q)


def read_text(path: Path) -> str:
    with open(path, 'r') as f:
        return f.read()


__name__ == "__main__" and main()
