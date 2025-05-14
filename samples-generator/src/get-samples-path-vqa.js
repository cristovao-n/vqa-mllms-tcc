import parquet from 'parquetjs';

const reader = await parquet.ParquetReader.openFile('datasets/path-vqa/data/test-00000-of-00003-e9adadb4799f44d3.parquet');
// create a new cursor
const cursor = reader.getCursor();
 
// read all records from the file and print them
const record = null;
while (record = await cursor.next()) {
  console.log(record);
}
