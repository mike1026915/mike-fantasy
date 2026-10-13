import { describe, expect, it } from 'vitest';
import { formatDate, inlineMarkup, readingMinutes } from './text';

describe('inlineMarkup', () => {
  it('turns **double asterisks** into <strong>', () => {
    expect(inlineMarkup('Built a **Salary Report** for consultants')).toBe(
      'Built a <strong>Salary Report</strong> for consultants',
    );
  });

  it('escapes HTML before adding markup', () => {
    expect(inlineMarkup('<script>alert("x")</script> & **ok**')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; <strong>ok</strong>',
    );
  });

  it('leaves an unmatched ** alone', () => {
    expect(inlineMarkup('2 ** 3')).toBe('2 ** 3');
  });
});

describe('readingMinutes', () => {
  it('is at least one minute, even for an empty body', () => {
    expect(readingMinutes()).toBe(1);
    expect(readingMinutes('short')).toBe(1);
  });

  it('counts Latin words at 200 per minute', () => {
    expect(readingMinutes('word '.repeat(401))).toBe(3);
  });

  it('counts CJK characters at 400 per minute', () => {
    expect(readingMinutes('字'.repeat(801))).toBe(3);
  });
});

describe('formatDate', () => {
  it('formats in UTC so builds do not depend on the local time zone', () => {
    expect(formatDate(new Date('2021-05-30T23:30:00Z'))).toBe('May 30, 2021');
  });
});
