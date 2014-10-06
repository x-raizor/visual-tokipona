# UTF-8
"""
Unescape UTF-8 file
"""

input_filename  = "js/data.js"
output_filename = "js/data_.js"

input_file = open(input_filename,'r')
output_text = [line.decode('unicode-escape') for line in input_file]
output_file = open(output_filename,'w')
for line in output_text:
	output_file.write(line.encode('utf-8').rstrip())
input_file.close()
output_file.close()
	