// Autonomous Vocabulary Service Tests
import { vocabularyService } from '../../services/mysqlService'

describe('Autonomous Vocabulary Service', () => {
  test('should get vocabulary by class and unit', async () => {
    const vocabulary = await vocabularyService.getByClassAndUnit(10, 1)
    expect(vocabulary).toBeDefined()
    expect(Array.isArray(vocabulary)).toBe(true)
  })

  test('should get vocabulary statistics', async () => {
    const stats = await vocabularyService.getStatistics()
    expect(stats).toBeDefined()
    expect(Array.isArray(stats)).toBe(true)
  })

  test('should search vocabulary', async () => {
    const results = await vocabularyService.searchVocabulary('food')
    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
  })
})
