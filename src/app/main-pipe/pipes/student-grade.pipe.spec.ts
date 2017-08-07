import { StudentGradePipe } from './student-grade.pipe';

describe('StudentGradePipe', () => {
  it('create an instance', () => {
    const pipe = new StudentGradePipe();
    expect(pipe).toBeTruthy();
  });
});
