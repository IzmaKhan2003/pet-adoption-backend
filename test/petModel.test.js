// import { expect } from 'chai'; // Use named import for expect
// import { getPets, addPet, getPetById, updatePet, deletePet } from '../models/PetModel'; // Import functions from PetModel
// import { initDb } from '../config/db'; // Import database initialization

// describe('Pet Model', function () {
//   // Initialize DB before running tests
//   before(async function () {
//     await initDb();
//   });

//   // Test case to get all pets
//   it('should fetch all pets', async function () {
//     const pets = await getPets();
//     expect(pets).to.be.an('array'); // Check that the result is an array
//   });

//   // Test case to add a new pet
//   it('should add a new pet', async function () {
//     const petDetails = {
//       PetName: 'Max',
//       PetType: 'Dog',
//       Breed: 'Labrador',
//       Age: 2,
//       PetSize: 'Medium',
//       Gender: 'Male',
//       HealthStatus: 'Healthy',
//       VaccinationStatus: 'Vaccinated',
//       Availability: 'Available'
//     };
//     await addPet(petDetails);
//     const pets = await getPets(); // Fetch all pets again
//     expect(pets.some(pet => pet.PetName === 'Max')).to.be.true; // Ensure the new pet is added
//   });

//   // Test case to get pet by ID
//   it('should fetch a pet by ID', async function () {
//     const pet = await getPetById(1); // Assuming pet with ID 1 exists
//     expect(pet).to.have.property('PetName');
//     expect(pet.PetID).to.equal(1);
//   });

//   // Test case to update a pet
//   it('should update a pet', async function () {
//     const petId = 1; // Assuming pet with ID 1 exists
//     const updatedPet = {
//       PetName: 'Max',
//       PetType: 'Dog',
//       Breed: 'Labrador',
//       Age: 3,
//       PetSize: 'Medium',
//       Gender: 'Male',
//       HealthStatus: 'Healthy',
//       VaccinationStatus: 'Vaccinated',
//       Availability: 'Adopted'
//     };
//     await updatePet(petId, updatedPet);
//     const pet = await getPetById(petId);
//     expect(pet.PetName).to.equal('Max'); // Ensure the pet name is updated
//   });

//   // Test case to delete a pet
//   it('should delete a pet', async function () {
//     const petId = 1; // Assuming pet with ID 1 exists
//     await deletePet(petId);
//     const pet = await getPetById(petId);
//     expect(pet).to.be.undefined; // Ensure the pet has been deleted
//   });
// });
