package mongoGridFs;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;
import com.mongodb.util.JSON;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Iterator;
import java.util.List;

import org.bson.Document;

import com.mongodb.MongoClient;

public class GridFSDemo {
	public static void main(String[] args) throws FileNotFoundException 
	{
        Mongo client= new MongoClient( "localhost" , 27017 );
        // Get the database object  
        DB db=client.getDB("mongoTest");  
        String collectionName="mongoCollectionTest";
        // Create a GridFS collection in the database object  
        GridFS gridFS= new GridFS(db,collectionName);         

//        // Create a test file, mongo exists by default  
//        File file=new File("/Users/jinghuing/Downloads/newMP3sample.mp3");  
//        FileInputStream fileInputStream=new FileInputStream(file);  
//        
//        // Create a gridFS file data stream  
//        GridFSInputFile createFile=gridFS.createFile(fileInputStream);  
//        // Set the file properties  
//        createFile.put("filename", "newMP3sample");  
//        createFile.put("text", "newText");
//        createFile.put("contentSpeech", "newMP3sample/mp3"); 
//        
//        createFile.save();  
//        
//        //according to the id query upload file 
//        GridFSDBFile findOne= gridFS.findOne(new BasicDBObject("_id",createFile.getId()));  
//        System.out.print(findOne + "\n\n"); 
//        
        // query all file list DBCursor database cursor 
        DBCursor fileList=gridFS.getFileList();  
        while(fileList.hasNext())  
        {  
            System.out.print(fileList.next());  
        }  
        
        // This query fetches the files I need
        BasicDBObject query = new BasicDBObject("text", "UserInputText4");
        List<GridFSDBFile> files = gridFS.find(query);
        System.out.println("\n\n" + files);
       
        //delete files 
//        gridFS.remove(new  BasicDBObject("_id",createFile.getId())); 
        
        client.close();  
	   }  
	}

