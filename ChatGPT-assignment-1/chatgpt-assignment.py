import unittest


class ArtSpace:
    def __init__(self, name, location):
        self.name = name
        self.location = location
        self.artists = {}
        self.events = []

    def add_artist(self, artist):
        if artist.id in self.artists:
            print("Artist already exists.")
        else:
            self.artists[artist.id] = artist
            print(f"Artist {artist.name} added to {self.name}.")

    def remove_artist(self, artist_id):
        if artist_id in self.artists:
            artist = self.artists.pop(artist_id)
            print(f"Artist {artist.name} removed from {self.name}.")
        else:
            print("Artist does not exist.")

    def add_event(self, event):
        if event.event_id in [e.event_id for e in self.events]:
            print("Event already exists.")
        else:
            self.events.append(event)
            print(f"Event {event.name} added to {self.name}.")

    def remove_event(self, event_id):
        for event in self.events:
            if event.event_id == event_id:
                self.events.remove(event)
                print(f"Event {event.name} removed from {self.name}.")
                return
        print("Event does not exist.")

    def conduct_event(self, event_id):
        for event in self.events:
            if event.event_id == event_id:
                print(f"Conducting event {event.name} in {self.name} on {event.date}.")
                self.events.remove(event)
                print(f"Event {event.name} removed from {self.name}.")
                return
        print("Event does not exist.")


class Artist:
    def __init__(self, name, id, discipline):
        self.name = name
        self.id = id
        self.discipline = discipline


class Event:
    def __init__(self, event_id, name, date, discipline, description):
        self.event_id = event_id
        self.name = name
        self.date = date
        self.discipline = discipline
        self.description = description
        self.artists = []

    def add_artist(self, artist):
        if artist.discipline == self.discipline and artist.art_space == True:
            self.artists.append(artist)
        else:
            print("Artist does not belong to the art space or does not have the required discipline.")

    def remove_artist(self, artist_id):
        for artist in self.artists:
            if artist.id == artist_id:
                self.artists.remove(artist)
                return
        print("Artist not found in the event.")

    def list_artists(self):
        print("Artists in the event:")
        for artist in self.artists:
            print(artist.name)

class TestArtSpace(unittest.TestCase):
    def setUp(self):
        self.art_space = ArtSpace("Art Haven", "New Delhi")
        self.artist1 = Artist("John Doe", 1, "painting")
        self.artist2 = Artist("Jane Smith", 2, "sculpture")
        self.event1 = Event(1, "Painting Exhibition", "2022-01-01", "painting", "An exhibition of paintings.")
        self.event2 = Event(2, "Sculpture Exhibition", "2022-02-01", "sculpture", "An exhibition of sculptures.")

    def test_add_artist_to_art_space(self):
        self.art_space.add_artist(self.artist1)
        self.assertIn(1, self.art_space.artists)
        self.art_space.add_artist(self.artist2)
        self.assertIn(2, self.art_space.artists)
        # Test adding duplicate artist
        self.art_space.add_artist(self.artist1)
        self.assertEqual(len(self.art_space.artists), 2)

    def test_remove_artist_from_art_space(self):
        self.art_space.add_artist(self.artist1)
        self.art_space.add_artist(self.artist2)
        self.art_space.remove_artist(1)
        self.assertNotIn(1, self.art_space.artists)
        # Test removing non-existent artist
        self.art_space.remove_artist(3)
        self.assertEqual(len(self.art_space.artists), 1)

    def test_add_event(self):
        self.art_space.add_event(self.event1)
        self.assertIn(self.event1, self.art_space.events)
        self.art_space.add_event(self.event2)
        self.assertIn(self.event2, self.art_space.events)
        # Test adding duplicate event
        self.art_space.add_event(self.event1)
        self.assertEqual(len(self.art_space.events), 2)

    def test_remove_event(self):
        self.art_space.add_event(self.event1)
        self.art_space.add_event(self.event2)
        self.art_space.remove_event(1)
        self.assertNotIn(self.event1, self.art_space.events)
        # Test removing non-existent event
        self.art_space.remove_event(3)
        self.assertEqual(len(self.art_space.events), 1)

    def test_conduct_event(self):
        self.art_space.add_event(self.event1)
        self.art_space.conduct_event(1)
        self.assertNotIn(self.event1, self.art_space.events)
        # Test conducting non-existent event
        self.art_space.conduct_event(2)
        self.assertEqual(len(self.art_space.events), 0)


if __name__ == '__main__':
    unittest.main()
