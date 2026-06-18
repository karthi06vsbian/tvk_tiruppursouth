import os

main_jsx_path = 'frontend/src/main.jsx'
new_chatbot_path = 'scratch/new_chatbot.js'

with open(main_jsx_path, 'r', encoding='utf-8') as f:
    main_content = f.read()

with open(new_chatbot_path, 'r', encoding='utf-8') as f:
    new_chatbot = f.read()

start_marker = '/* ─── ChatBot Component ───────────────────────────────────────── */'
end_marker = 'function TrackPetitionModal'

start_idx = main_content.find(start_marker)
end_idx = main_content.find(end_marker)

if start_idx == -1:
    print("Error: Start marker not found!")
    exit(1)
if end_idx == -1:
    print("Error: End marker not found!")
    exit(1)

# Verify start_idx is before end_idx
if start_idx >= end_idx:
    print("Error: Start marker is after End marker!")
    exit(1)

# Replace the chatbot component block
updated_content = main_content[:start_idx] + new_chatbot + "\n\n" + main_content[end_idx:]

with open(main_jsx_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Chatbot replacement completed successfully!")
