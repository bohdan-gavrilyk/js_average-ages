'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  let filterMan = people.filter(item => item['sex'] === 'm');

  if (century) {
    filterMan = filterMan
      .filter(item => Math.ceil(item['died'] / 100) === century);
  }

  return filterMan.reduce((sum, { born, died }) => sum + died - born, 0)
    / filterMan.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let filterWoman = people.filter(item => item['sex'] === 'f');

  if (withChildren) {
    filterWoman = filterWoman
      .filter(item => people.find(child => child['mother'] === item['name']));
  }

  return filterWoman.reduce((sum, { born, died }) => sum + died - born, 0)
    / filterWoman.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const childrens = people
    .filter(child => onlyWithSon ? people.find(
      person => child.sex === 'm' && child.mother === person.name) : people
      .find(person => child.mother === person.name)
    );

  return childrens.reduce((sum, { mother, born }) =>
    sum + born - (people[people.findIndex(fomale => fomale.name === mother)]
      .born), 0) / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
