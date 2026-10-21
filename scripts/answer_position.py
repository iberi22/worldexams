"""Deterministic answer-letter placement for WorldExams bundle generators.

Helpers to remove the answer-letter bias produced by template-driven generators:
every bundle gets a balanced sequence of correct-answer letters, and option
feedback always follows its option when reordering.
"""
import hashlib
import random


def _rng(seed_str):
    h = hashlib.sha256(seed_str.encode("utf-8")).hexdigest()
    return random.Random(int(h, 16))


def place_correct(options, correct_index, bundle_id, qnum):
    """Shuffle the 4 options deterministically and report the correct letter.

    ``options`` is a list of 4 items (typically (letter, text, is_correct, feedback)
    tuples). ``correct_index`` points at the correct option in the original list.
    Returns ``(reordered_options, letter)`` where ``letter`` is 'A'..'D'.
    """
    if len(options) != 4:
        raise ValueError("place_correct expects exactly 4 options")
    if correct_index < 0 or correct_index >= len(options):
        raise ValueError("correct_index out of range")
    indexed = list(enumerate(options))
    rng = _rng(f"{bundle_id}|{qnum}")
    rng.shuffle(indexed)
    pos = next(i for i, (oi, _) in enumerate(indexed) if oi == correct_index)
    letter = chr(ord("A") + pos)
    reordered = [opt for _, opt in indexed]
    return reordered, letter


def balanced_letters(bundle_id, n):
    """Return a list of ``n`` letters with each letter in [floor, ceil] counts."""
    if n < 0:
        raise ValueError("n must be non-negative")
    base = n // 4
    rem = n % 4
    counts = [base + (1 if i < rem else 0) for i in range(4)]
    letters = []
    for i, c in enumerate(counts):
        letters.extend([chr(ord("A") + i)] * c)
    rng = _rng(f"balance|{bundle_id}")
    rng.shuffle(letters)
    return letters


def reorder_to_letter(options, correct_index, target_letter):
    """Reorder 4 options so the correct one lands on ``target_letter``.

    Feedback (and any other per-option payload) stays attached to its option.
    Letters are relabelled A-D according to the new positions.
    """
    if len(options) != 4:
        raise ValueError("reorder_to_letter expects exactly 4 options")
    if target_letter not in "ABCD":
        raise ValueError("target_letter must be A-D")
    ci = correct_index
    if ci < 0 or ci >= len(options):
        raise ValueError("correct_index out of range")
    target_idx = ord(target_letter) - ord("A")
    others = [o for i, o in enumerate(options) if i != ci]
    new = [None] * 4
    new[target_idx] = options[ci]
    oi = 0
    for idx in range(4):
        if new[idx] is None:
            new[idx] = others[oi]
            oi += 1
    return [(chr(ord("A") + idx),) + tuple(o[1:]) for idx, o in enumerate(new)]
