# -*- coding: utf-8 -*-
"""
Main execution script to generate all 10 bundles for Bolivia Math Grade 11 (2026).
"""

from gen_bo_math_common import generate_week_file
from gen_bo_math_w1_w5 import make_w01_questions, make_w02_questions, make_w03_questions, make_w04_questions, make_w05_questions
from gen_bo_math_w6_w10 import make_w06_questions, make_w07_questions, make_w08_questions, make_w09_questions, make_w10_questions

def main():
    print("Starting generation of Bolivia Grade 11 Math Weekly Bundles...")

    # Week 1
    generate_week_file("W01", "tema-w01", make_w01_questions())

    # Week 2
    generate_week_file("W02", "tema-w02", make_w02_questions())

    # Week 3
    generate_week_file("W03", "tema-w03", make_w03_questions())

    # Week 4
    generate_week_file("W04", "tema-w04", make_w04_questions())

    # Week 5
    generate_week_file("W05", "tema-w05", make_w05_questions())

    # Week 6
    generate_week_file("W06", "tema-w06", make_w06_questions())

    # Week 7
    generate_week_file("W07", "tema-w07", make_w07_questions())

    # Week 8
    generate_week_file("W08", "tema-w08", make_w08_questions())

    # Week 9
    generate_week_file("W09", "tema-w09", make_w09_questions())

    # Week 10
    generate_week_file("W10", "tema-w10", make_w10_questions())

    print("All 10 weekly bundles generated successfully under 'questions_data/bolivia/matematicas/grado-11/2026/weekly/'.")

if __name__ == "__main__":
    main()
