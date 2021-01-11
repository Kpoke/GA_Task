// await connection.manager.save(
//   connection.manager.create(User, {
//     firstName: "Timber",
//     lastName: "Saw",
//     age: 27,
//   })
// );
// await connection.manager.save(
//   connection.manager.create(User, {
//     firstName: "Phantom",
//     lastName: "Assassin",
//     age: 24,
//   })
// );

import { Character_Data } from "./src/entity/Character";
import { CharacterStatus } from "./src/character-status.enum";
import { Gender } from "./src/gender.enum";
import { Location } from "./src/entity/Location";
import { Episode } from "./src/entity/Episode";
import { Comment } from "./src/entity/Comments";

export const intialize_db = async (connection): Promise<void> => {
  const location1 = new Location();
  location1.latitude = 46;
  location1.longitude = 53;
  location1.name = "Awol";

  const character1 = new Character_Data();
  character1.firstName = "Jack";
  character1.lastName = "Bauer";
  character1.status = CharacterStatus.ACTIVE;
  character1.stateOfOrigin = "Washington";
  character1.gender = Gender.MALE;
  character1.location = location1;

  const location2 = new Location();
  location2.latitude = 17;
  location2.longitude = 20;
  location2.name = "Igboro";

  const character2 = new Character_Data();
  character2.firstName = "Sunday";
  character2.lastName = "Dagboru";
  character2.status = CharacterStatus.ACTIVE;
  character2.gender = Gender.MALE;
  character2.location = location2;

  const character3 = new Character_Data();
  character3.firstName = "Darken";
  character3.lastName = "Rahl";
  character3.status = CharacterStatus.ACTIVE;
  character3.stateOfOrigin = "Underworld";
  character3.gender = Gender.MALE;

  const character4 = new Character_Data();
  character4.firstName = "Uchiha";
  character4.lastName = "Itachi";
  character4.status = CharacterStatus.UNKNOWN;
  character4.stateOfOrigin = "Konoha";
  character4.gender = Gender.MALE;

  const character5 = new Character_Data();
  character5.firstName = "Fish";
  character5.lastName = "Mooney";
  character5.status = CharacterStatus.DEAD;
  character5.stateOfOrigin = "Gotham";
  character5.gender = Gender.FEMALE;

  const episode1 = new Episode();
  episode1.name = "Ija Igboro, Always Guiding";
  episode1.episodeCode = "44555";
  episode1.releaseDate = new Date("05/05/2020");
  episode1.characters = [character1, character2];

  const episode2 = new Episode();
  episode2.name = "Ija Igboro, Always Guiding Part 2";
  episode2.episodeCode = "445655";
  episode2.releaseDate = new Date("09/05/2020");
  episode2.characters = [character5, character4];

  const character6 = new Character_Data();
  character6.firstName = "Jomsy";
  character6.lastName = "Jor jor";
  character6.status = CharacterStatus.ACTIVE;
  character6.gender = Gender.MALE;
  character6.episodes = [episode1, episode2];

  const comment1 = new Comment();
  comment1.comment = "The fight made sense";
  comment1.episode = episode1;
  comment1.ipAddressLocation = "Lagos";

  const comment2 = new Comment();
  comment2.comment = "bland";
  comment2.episode = episode1;
  comment2.ipAddressLocation = "Lagos";

  const comment3 = new Comment();
  comment3.comment = "Okay";
  comment3.episode = episode1;
  comment3.ipAddressLocation = "Abuja";

  const comment4 = new Comment();
  comment4.comment = "Interesting";
  comment4.episode = episode1;
  comment4.ipAddressLocation = "Lagos";

  const comment5 = new Comment();
  comment5.comment = "Just there";
  comment5.episode = episode1;
  comment5.ipAddressLocation = "Abuja";

  await connection.manager.save(location1);
  await connection.manager.save(location2);
  await connection.manager.save(character1);
  await connection.manager.save(character2);
  await connection.manager.save(character3);
  await connection.manager.save(character4);
  await connection.manager.save(character5);
  await connection.manager.save(episode1);
  await connection.manager.save(episode2);
  await connection.manager.save(comment1);

  setTimeout(async () => {
    await connection.manager.save(comment2);
    await connection.manager.save(character6);
  }, 5000);

  setTimeout(async () => {
    await connection.manager.save(comment3);
  }, 10000);

  setTimeout(async () => {
    await connection.manager.save(comment4);
  }, 15000);

  setTimeout(async () => {
    await connection.manager.save(comment5);
  }, 25000);
};
