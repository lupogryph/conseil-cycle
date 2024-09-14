import { FilterEmptyPipe } from './filter-empty.pipe';

describe('FilterEmptyPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterEmptyPipe();
    expect(pipe).toBeTruthy();
  });
});
