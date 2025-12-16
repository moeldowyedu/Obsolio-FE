#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read the file
with open(r'd:\Antigravity\OBSOLIO-FE\src\translations\index.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix line 783 (index 782) - the Arabic startFreeTrial
# We'll replace any non-ASCII characters in that specific line with the correct Arabic
for i, line in enumerate(lines):
    if i == 782:  # Line 783 (0-indexed)
        if 'startFreeTrial' in line:
            lines[i] = "        startFreeTrial: 'جرّب مجاناً',\r\n"
            print(f"Fixed line {i+1}: startFreeTrial")
    
# Write back
with open(r'd:\Antigravity\OBSOLIO-FE\src\translations\index.js', 'w', encoding='utf-8', newline='') as f:
    f.writelines(lines)

print("Done!")
