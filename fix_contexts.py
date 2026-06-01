# -*- coding: utf-8 -*-
import re
import sys

file_path = r"E:\scripts-python\worldexams\questions_data\colombia\ingles\grado-11\periodo-1\global-issues\CO-ING-11-P1-global-issues-001-MASTERY-bundle.md"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

context_1 = """### Contexto
**The Fast Fashion Dilemma**
Fast fashion—the rapid production of inexpensive, trendy clothing—has revolutionized the retail industry. Brands like Zara, H&M, and Shein can design, produce, and distribute a garment globally in under three weeks. This model offers consumers affordable ways to participate in passing trends, democratizing style that was once exclusive to high-end runways.

However, the hidden costs of this convenience are devastating. The textile industry is currently the second-largest polluter of clean water globally. To keep prices abnormally low, manufacturing is outsourced to developing nations where labor laws are lax, leading to sweatshop conditions and poverty wages for garment workers, overwhelmingly women.

Furthermore, the environmental footprint is massive. Fast fashion garments are often made of synthetic, petroleum-based fabrics like polyester, which shed microplastics into the ocean with every wash. Because the clothes are cheaply made and quickly go out of style, consumers treat them as disposable. As a result, millions of tons of textiles end up in landfills or are incinerated each year.

The emerging movement of "sustainable fashion" seeks to combat this. It emphasizes buying fewer, higher-quality items, thrifting, and supporting brands that guarantee ethical labor practices and use organic or recycled materials. Yet, the question remains: can sustainable fashion scale up enough to become the norm, or will the addictive allure of a five-dollar t-shirt continue to dictate the market?

### Enunciado"""

context_2 = """### Contexto
**The Rise of Artificial Intelligence in Education**
Artificial Intelligence (AI) is rapidly transforming classrooms worldwide. Proponents argue that AI can provide personalized tutoring, adapting instantly to a student's __(11)__ pace. Furthermore, automated grading systems can relieve teachers of tedious administrative work, allowing them to focus more passionately on interactive pedagogy.

__(12)__, critics warn of significant risks. There are profound concerns about data privacy and the potential for algorithms to inherit human biases. If an AI system is trained on historically flawed data, it might unintentionally __(13)__ discrimination against minority students. Moreover, relying too heavily on screens could diminish the crucial socialization skills that children develop through human-to-human interaction. Ultimately, integrating AI into schools __(14)__ careful ethical oversight. We must ensure that technology serves as a tool to enhance human empathy, rather than an independent entity that __(15)__ human judgment.

### Enunciado"""

lines = content.split("\n")
new_lines = []
current_q = None

for line in lines:
    m = re.match(r"^## Question (\d+)", line)
    if m:
        current_q = int(m.group(1))

    if line == "### Enunciado" and current_q is not None:
        if 6 <= current_q <= 10:
            new_lines.append(context_1)
        elif 11 <= current_q <= 15:
            new_lines.append(context_2)
        else:
            new_lines.append(line)
    else:
        new_lines.append(line)

with open(file_path, "w", encoding="utf-8") as f:
    f.write("\n".join(new_lines))

print("Done applying contexts!")
