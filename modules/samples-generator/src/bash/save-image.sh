dataset=$1
image_path=$2
sample_type=$3
sample_number=$4

final_path=../../samples/$dataset/$sample_type/$sample_number

mkdir -p $final_path && cp ../../datasets/$dataset/$image_path $final_path
