import os
import re

# Files to update
files = [
    r'd:\Antigravity\OBSOLIO-FE\specs\architecture\N8N_INTEGRATION.md',
    r'd:\Antigravity\OBSOLIO-FE\specs\architecture\N8N_WORKFLOW_TEMPLATES.md',
    r'd:\Antigravity\OBSOLIO-FE\specs\architecture\N8N_CLOUD_SETUP.md'
]

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace Aasim with OBSOLIO
        content = content.replace('Aasim', 'OBSOLIO')
        content = content.replace('aasim', 'obsolio')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Updated: {filepath}")
    except Exception as e:
        print(f"Error updating {filepath}: {e}")

print("Done!")
