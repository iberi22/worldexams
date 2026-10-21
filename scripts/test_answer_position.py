import hashlib
import unittest
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from answer_position import place_correct, balanced_letters, reorder_to_letter


class TestAnswerPosition(unittest.TestCase):
    def test_determinism_place_correct(self):
        opts = [("A", "t1", False, "fb1"), ("B", "t2", True, "fb2"), ("C", "t3", False, "fb3"), ("D", "t4", False, "fb4")]
        r1, l1 = place_correct(opts, 1, "BUNDLE-1", 3)
        r2, l2 = place_correct(opts, 1, "BUNDLE-1", 3)
        self.assertEqual(l1, l2)
        self.assertEqual(r1, r2)

    def test_feedback_follows_option(self):
        opts = [("A", "t1", False, "fb1"), ("B", "t2", True, "fb2"), ("C", "t3", False, "fb3"), ("D", "t4", False, "fb4")]
        reordered, letter = place_correct(opts, 1, "B-1", 2)
        # find correct in reordered
        idx = ord(letter) - 65
        self.assertTrue(reordered[idx][2])
        self.assertEqual(reordered[idx][3], "fb2")
        # all feedback preserved
        self.assertEqual(sorted(o[3] for o in reordered), ["fb1", "fb2", "fb3", "fb4"])

    def test_balanced_counts(self):
        seq = balanced_letters("B-2", 10)
        self.assertEqual(len(seq), 10)
        from collections import Counter
        c = Counter(seq)
        for L in "ABCD":
            self.assertIn(c[L], (2, 3))

    def test_balanced_determinism(self):
        self.assertEqual(balanced_letters("X", 20), balanced_letters("X", 20))

    def test_distinct_keys_95(self):
        ids = [f"BUNDLE-{i}" for i in range(200)]
        keys = []
        for bid in ids:
            letters = balanced_letters(bid, 10)
            keys.append("".join(letters))
        # distinctness: at least 95% distinct
        distinct = len(set(keys))
        self.assertGreaterEqual(distinct / len(keys), 0.95)

    def test_reorder_to_letter(self):
        opts = [("A", "t1", False, "fb1"), ("B", "t2", True, "fb2"), ("C", "t3", False, "fb3"), ("D", "t4", False, "fb4")]
        new = reorder_to_letter(opts, 1, "C")
        self.assertEqual(new[2][2], True)
        self.assertEqual(new[2][3], "fb2")
        self.assertEqual([o[0] for o in new], ["A", "B", "C", "D"])


if __name__ == "__main__":
    unittest.main()
