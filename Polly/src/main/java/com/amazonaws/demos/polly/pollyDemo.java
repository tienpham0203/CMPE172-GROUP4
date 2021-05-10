package com.amazonaws.demos.polly;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.ClientConfiguration;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.polly.AmazonPollyClient;
import com.amazonaws.services.polly.AmazonPollyClientBuilder;
import com.amazonaws.services.polly.model.DescribeVoicesRequest;
import com.amazonaws.services.polly.model.DescribeVoicesResult;
import com.amazonaws.services.polly.model.OutputFormat;
import com.amazonaws.services.polly.model.SynthesizeSpeechRequest;
import com.amazonaws.services.polly.model.SynthesizeSpeechResult;
import com.amazonaws.services.polly.model.Voice;
import com.amazonaws.services.polly.model.VoiceId;
import com.amazonaws.services.polly.AmazonPolly;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;
import java.util.List;


public class pollyDemo {
	private static String bucket_name = "bucket---s3";
	private static String file_name = "readme";
	private static final AmazonPollyClient polly = new AmazonPollyClient(new DefaultAWSCredentialsProviderChain(), 
			new ClientConfiguration());
	private final Voice voice;
	private final static AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(Regions.US_WEST_1).build();
	private static String Text = null;

	public static void main(String args[]) throws Exception {
		//retrieve the String from S3 bucket object
		try {
        	Text = s3.getObjectAsString(bucket_name, file_name);
        	} catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
            System.exit(1);
        }
		System.out.println(Text);
		InputStream n = SynthesizeSpeechSample(Text);
		s3.putObject(bucket_name, "Polly peech", n, null);
	}
	
	public static Bucket getBucket(String bucket_name) {
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(Regions.US_WEST_1).build();
        Bucket named_bucket = null;
        List<Bucket> buckets = s3.listBuckets();
        for (Bucket b : buckets) {
            if (b.getName().equals(bucket_name)) {
                named_bucket = b;
            }
        }
        return named_bucket;
    }
	

	public static InputStream SynthesizeSpeechSample(String Text){        
        SynthesizeSpeechRequest synthesizeSpeechRequest = new SynthesizeSpeechRequest()
                .withOutputFormat(OutputFormat.Mp3)
                .withVoiceId(VoiceId.Joanna)
                .withText(Text);
 
            SynthesizeSpeechResult synthesizeSpeechResult = polly.synthesizeSpeech(synthesizeSpeechRequest);
            InputStream in = synthesizeSpeechResult.getAudioStream();
//            try (InputStream in = synthesizeSpeechResult.getAudioStream()){
//                while ((readBytes = in.read(buffer)) > 0) {
//                    outputStream.write(buffer, 0, readBytes);
//                }
//                return in;
//            }
//        } catch (Exception e) {
//            System.err.println("Exception caught: " + e);
        return in;     
}
	
	public pollyDemo(Region region) {

		DescribeVoicesRequest describeVoicesRequest = new DescribeVoicesRequest();

		// Synchronously ask Amazon Polly to describe available TTS voices.
		DescribeVoicesResult describeVoicesResult = polly.describeVoices(describeVoicesRequest);
		voice = describeVoicesResult.getVoices().get(2);
	}
	
	
	

	public InputStream synthesize(String text, OutputFormat format) throws IOException {
		SynthesizeSpeechRequest synthReq = 
		new SynthesizeSpeechRequest().withText(text).withVoiceId(voice.getId())
				.withOutputFormat(format);
		SynthesizeSpeechResult synthRes = polly.synthesizeSpeech(synthReq);

		return synthRes.getAudioStream();
	}
}