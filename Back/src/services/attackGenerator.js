import { COUNTRIES, ATTACK_TYPES } from '../config/countries.js';

class AttackGenerator {
  constructor() {
    this.countryNames = Object.keys(COUNTRIES);
    this.attackId = 0;
  }

  generateRandomAttack() {
    const sourceCountry = this.getRandomCountry();
    const targetCountry = this.getRandomCountry(sourceCountry);
    const attackType = this.getRandomAttackType();
    const intensity = Math.floor(Math.random() * 10) + 1;

    return {
      id: `attack_${++this.attackId}_${Date.now()}`,
      sourceCountry,
      targetCountry,
      sourceLat: COUNTRIES[sourceCountry].lat,
      sourceLng: COUNTRIES[sourceCountry].lng,
      targetLat: COUNTRIES[targetCountry].lat,
      targetLng: COUNTRIES[targetCountry].lng,
      type: attackType,
      intensity,
      timestamp: new Date().toISOString(),
      createdAt: Date.now()
    };
  }

  getRandomCountry(exclude = null) {
    let country;
    do {
      country = this.countryNames[Math.floor(Math.random() * this.countryNames.length)];
    } while (country === exclude);
    return country;
  }

  getRandomAttackType() {
    return ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)];
  }

  // Generate attacks with weighted probabilities (some countries attack more)
  generateRealisticAttack() {
    const highThreatSources = ['China', 'Russia', 'North Korea', 'Iran'];
    const popularTargets = ['United States', 'Germany', 'United Kingdom', 'Japan', 'South Korea'];
    
    // 60% chance attack comes from high-threat country
    const sourceCountry = Math.random() < 0.6 && highThreatSources.length > 0
      ? highThreatSources[Math.floor(Math.random() * highThreatSources.length)]
      : this.getRandomCountry();

    // 70% chance attack targets popular target
    const targetCountry = Math.random() < 0.7 && popularTargets.length > 0
      ? popularTargets[Math.floor(Math.random() * popularTargets.length)]
      : this.getRandomCountry(sourceCountry);

    const attack = this.generateRandomAttack();
    attack.sourceCountry = sourceCountry;
    attack.targetCountry = targetCountry;
    attack.sourceLat = COUNTRIES[sourceCountry].lat;
    attack.sourceLng = COUNTRIES[sourceCountry].lng;
    attack.targetLat = COUNTRIES[targetCountry].lat;
    attack.targetLng = COUNTRIES[targetCountry].lng;

    return attack;
  }
}

export default AttackGenerator;