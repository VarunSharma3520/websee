/*

Algorithm
---------

FuzzyMatchV1 finds the first "fuzzy" occurrence of the pattern within the given
text in O(n) time where n is the length of the text. Once the position of the
last character is located, it traverses backwards to see if there's a shorter
substring that matches the pattern.

    a_____b___abc__  To find "abc"
    *-----*-----*>   1. Forward scan
             <***    2. Backward scan

The algorithm is simple and fast, but as it only sees the first occurrence,
it is not guaranteed to find the occurrence with the highest score.

    a_____b__c__abc
    *-----*--*  ***

FuzzyMatchV2 implements a modified version of Smith-Waterman algorithm to find
the optimal solution (highest score) according to the scoring criteria. Unlike
the original algorithm, omission or mismatch of a character in the pattern is
not allowed.

Performance
-----------

The new V2 algorithm is slower than V1 as it examines all occurrences of the
pattern instead of stopping immediately after finding the first one. The time
complexity of the algorithm is O(nm) if a match is found and O(n) otherwise
where n is the length of the item and m is the length of the pattern. Thus, the
performance overhead may not be noticeable for a query with high selectivity.
However, if the performance is more important than the quality of the result,
you can still choose v1 algorithm with --algo=v1.

Scoring criteria
----------------

- We prefer matches at special positions, such as the start of a word, or
  uppercase character in camelCase words.

- That is, we prefer an occurrence of the pattern with more characters
  matching at special positions, even if the total match length is longer.
    e.g. "fuzzyfinder" vs. "fuzzy-finder" on "ff"
                            ````````````
- Also, if the first character in the pattern appears at one of the special
  positions, the bonus point for the position is multiplied by a constant
  as it is extremely likely that the first character in the typed pattern
  has more significance than the rest.
    e.g. "fo-bar" vs. "foob-r" on "br"
          ``````
- But since fzf is still a fuzzy finder, not an acronym finder, we should also
  consider the total length of the matched substring. This is why we have the
  gap penalty. The gap penalty increases as the length of the gap (distance
  between the matching characters) increases, so the effect of the bonus is
  eventually cancelled at some point.
    e.g. "fuzzyfinder" vs. "fuzzy-blurry-finder" on "ff"
          ```````````
- Consequently, it is crucial to find the right balance between the bonus
  and the gap penalty. The parameters were chosen that the bonus is cancelled
  when the gap size increases beyond 8 characters.

- The bonus mechanism can have the undesirable side effect where consecutive
  matches are ranked lower than the ones with gaps.
    e.g. "foobar" vs. "foo-bar" on "foob"
                       ```````
- To correct this anomaly, we also give extra bonus point to each character
  in a consecutive matching chunk.
    e.g. "foobar" vs. "foo-bar" on "foob"
          ``````
- The amount of consecutive bonus is primarily determined by the bonus of the
  first character in the chunk.
    e.g. "foobar" vs. "out-of-bound" on "oob"
                       ````````````
*/

function smithWaterman(sequence1, sequence2, matchScore = 2, mismatchScore = -1, gapPenalty = -1) {
  const m = sequence1.length;
  const n = sequence2.length; const matrix = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  let maxScore = 0;
  let maxI = 0;
  let maxJ = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const match = matrix[i - 1][j - 1] + (sequence1[i - 1] === sequence2[j - 1] ? matchScore : mismatchScore);
      const deletion = matrix[i - 1][j] + gapPenalty;
      const insertion = matrix[i][j - 1] + gapPenalty;

      matrix[i][j] = Math.max(match, deletion, insertion, 0);

      if (matrix[i][j] > maxScore) {
        maxScore = matrix[i][j];
        maxI = i;
        maxJ = j;
      }
    }
  }

  const alignment1 = [];
  const alignment2 = [];

  while (maxI > 0 && maxJ > 0 && matrix[maxI][maxJ] > 0) {  // Continue while the score is positive
    if (matrix[maxI][maxJ] === matrix[maxI - 1][maxJ - 1] + (sequence1[maxI - 1] === sequence2[maxJ - 1] ? matchScore : mismatchScore)) {
      alignment1.unshift(sequence1[maxI - 1]);
      alignment2.unshift(sequence2[maxJ - 1]);
      maxI--;
      maxJ--;
    } else if (matrix[maxI][maxJ] === matrix[maxI - 1][maxJ] + gapPenalty) {
      alignment1.unshift(sequence1[maxI - 1]);
      alignment2.unshift('-');
      maxI--;
    } else {
      alignment1.unshift('-');
      alignment2.unshift(sequence2[maxJ - 1]);
      maxJ--;
    }
  }

  return maxScore
  //return {
  //  alignment1: alignment1.join(''),
  //  alignment2: alignment2.join(''),
  //  score: maxScore
  //};
}


export function websee(data, pattern, option) {
  
  const index = []
  for (let i = 0; i < data.length; i++) {
    const result = smithWaterman(data[i].toLowerCase(), pattern.toLowerCase(), 2, -1, -1)
    index.push([data[i], result])
  }
  return index
}


