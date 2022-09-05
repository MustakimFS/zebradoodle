package Zebrado;
import java.io.*;
import java.util.*;
import java.nio.charset.*;
public class Zebradoodle {
	public static void main (String args[]) throws IOException{
		BufferedReader br = new BufferedReader (new InputStreamReader (System.in));
		String input = generateWord();
		//System.out.println(input);
		ArrayList<Character> output = new ArrayList<>();
		ArrayList<Character> checker = new ArrayList<>();
		Character alphabets[] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
		int chances = 0;
		int finalresult = 0;
		while(chances<input.length()+1) {
			String guess = getGuess();
			output = compare(input, guess);
			for(int i=0;i<output.size();i++) {
				checker.add(Character.toLowerCase(output.get(i)));
			}
			int flag=0;
			for(int i=0;i<input.length();i++) {
				if(checker.get(i)!=input.charAt(i))
					flag=1;
			}
			if(flag==0) {
				System.out.println("BINGO!! The word was "+ input);
				finalresult=1;
				break;
			}
			else {
				System.out.println(output);
				for(int i=0;i<output.size();i++) {
					for(int j=0;j<alphabets.length;j++) {
						if(Character.toLowerCase(output.get(i))==alphabets[j]) {
							alphabets[j] = Character.toUpperCase(alphabets[j]);
						}
					}
				}
				for(int i=0;i<guess.length();i++) {
					int present=0;
					for(int j=0;j<output.size();j++) {
						if(guess.charAt(i)==Character.toLowerCase(output.get(j))) {
							present=1;
							break;
						}
					}
					if(present==0) {
						for(int j=0;j<alphabets.length;j++) {
							if(guess.charAt(i)==alphabets[j]) {
								alphabets[j]=' ';
								break;
							}
						}
					}
				}
				chances++;
				System.out.println(Arrays.toString(alphabets));
			}
			checker.clear();
		}
		if(finalresult==0)
			System.out.println("You Lose :( the word was "+ input);
	}
	
	public static String generateWord() throws IOException{
//		BufferedReader br = new BufferedReader (new InputStreamReader (System.in));
//		boolean flag = false;
//		String str = new String();
//		while(flag!=true) {
//			str = br.readLine();
//			if(str.length()==5)
//				flag=true;
//			else
//				System.out.println("input size is 5");
//		}
//		str = str.toLowerCase();
//		return str;
		String str = new String();
		Random r = new Random();
		int firstIndex = r.nextInt(25);
		int secondIndex;
		String path = new String();
		ArrayList<String> arr = new ArrayList<>();
		switch (firstIndex) {
			case 0:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\A words.txt";
				InputStream is0 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is0, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 1:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\B words.txt";
				InputStream is1 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is1, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 2:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\C words.txt";
				InputStream is2 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is2, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 3:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\D words.txt";
				InputStream is3 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is3, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 4:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\E words.txt";
				InputStream is4 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is4, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 5:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\F words.txt";
				InputStream is5 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is5, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 6:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\G words.txt";
				InputStream is6 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is6, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 7:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\H words.txt";
				InputStream is7 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is7, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 8:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\I words.txt";
				InputStream is8 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is8, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 9:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\J words.txt";
				InputStream is9 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is9, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 10:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\K words.txt";
				InputStream is10 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is10, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 11:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\L words.txt";
				InputStream is11 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is11, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 12:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\M words.txt";
				InputStream is12 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is12, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 13:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\N words.txt";
				InputStream is13 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is13, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 14:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\O words.txt";
				InputStream is14 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is14, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 15:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\P words.txt";
				InputStream is15 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is15, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 16:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\Q words.txt";
				InputStream is16 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is16, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 17:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\R words.txt";
				InputStream is17 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is17, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 18:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\S words.txt";
				InputStream is18 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is18, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 19:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\T words.txt";
				InputStream is19 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is19, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 20:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\U words.txt";
				InputStream is20 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is20, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 21:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\V words.txt";
				InputStream is21 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is21, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 22:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\W words.txt";
				InputStream is22 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is22, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 23:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\X words.txt";
				InputStream is23 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is23, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 24:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\Y words.txt";
				InputStream is24 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is24, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
			case 25:
				path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\Z words.txt";
				InputStream is25 = new FileInputStream(path);
		        try (Scanner sc = new Scanner(
		                 is25, StandardCharsets.UTF_8.name())) {
		            while (sc.hasNext()) {
		                String s = sc.next();
		                s = s.toLowerCase();
		                arr.add(s);
		            }
		        }
				secondIndex = r.nextInt(arr.size());
				str =  arr.get(secondIndex);
				break;
		}
		return str;
	}
	
	public static String getGuess() throws IOException{
		BufferedReader br = new BufferedReader (new InputStreamReader (System.in));
		boolean flag = false;
		String str = new String();
		while(flag!=true) {
			str = br.readLine();
			if(str.length()==5) {
				if(present(str))
					flag=true;
				else
					System.out.println("not a word try again");
			}
			else
				System.out.println("input size is 5");
		}
		str = str.toLowerCase();
		return str;
	}
	
	public static ArrayList<Character> compare(String input, String guess){
		ArrayList<Integer> positionsGuess = new ArrayList<>();
		ArrayList<Integer> positionsInput = new ArrayList<>();
		ArrayList<Integer> tempPositions = new ArrayList<>();
		ArrayList<Integer> tempPositionsGuess = new ArrayList<>();
		ArrayList<Character> output = new ArrayList<>();
		ArrayList<Integer> deleteThis = new ArrayList<>();
		ArrayList<Character> handled = new ArrayList<>();
		int alreadyHandled=0;
		for(int i=0;i<input.length();i++) {
			output.add(' ');
		}
		for(int i=0;i<input.length();i++) {
			char current = guess.charAt(i);
			for(int x=0;x<handled.size();x++) {
				if(current==handled.get(x))
					alreadyHandled=1;
			}
			if(alreadyHandled!=1) {
			positionsGuess = getPositions( guess, current);
			positionsInput = getPositions( input, current);
//			System.out.println(current);
//			System.out.println(positionsGuess);
//			System.out.println(positionsInput);
			if(positionsInput.size()!=0) {
				for(int j=0;j<positionsInput.size();j++) {
					if(input.charAt(positionsInput.get(j)) == guess.charAt(positionsInput.get(j))) {
						output.set(positionsInput.get(j), Character.toUpperCase(input.charAt(positionsInput.get(j))));
						deleteThis.add(positionsInput.get(j));
					}
				}
//				System.out.println(deleteThis);
				for(int j=0;j<positionsInput.size();j++) {
					tempPositions.add(positionsInput.get(j));
				}
				positionsInput.clear();
				for(int j=0;j<positionsGuess.size();j++) {
					tempPositionsGuess.add(positionsGuess.get(j));
				}
				positionsGuess.clear();
//				System.out.println(tempPositionsGuess);
				for(int j=0;j<tempPositions.size();j++) {
					int flag=0;
					for(int k=0;k<deleteThis.size();k++) {
						if(tempPositions.get(j)==deleteThis.get(k)) {
							flag=1;
						}
					}
					if(flag!=1) {
						positionsInput.add(tempPositions.get(j));
					}
				}
				for(int j=0;j<tempPositionsGuess.size();j++) {
					int flag=0;
					for(int k=0;k<deleteThis.size();k++) {
						if(tempPositionsGuess.get(j)==deleteThis.get(k)) {
							flag=1;
						}
					}
					if(flag!=1) {
						positionsGuess.add(tempPositionsGuess.get(j));
					}
				}
				//System.out.println("This is for input "+current +" " + positionsInput);
				//System.out.println("This is for guess "+current +" " + positionsGuess);
				//System.out.println("This is diff "+Math.min(positionsInput.size(), positionsGuess.size()));
				if(positionsGuess.size()!=0 && positionsInput.size()!=0) {
					for(int j=0;j<Math.min(positionsInput.size(), positionsGuess.size());j++) {
						output.set(positionsGuess.get(j), guess.charAt(positionsGuess.get(j)));
					}
				}
			}
			//System.out.println(output);
			positionsInput.clear();
			positionsGuess.clear();
			tempPositions.clear();
			tempPositionsGuess.clear();
			handled.add(current);
		}
			alreadyHandled=0;
		}
		return output;
	}
	
	public static ArrayList<Integer> getPositions( String word, char current){
		ArrayList<Integer> positions = new ArrayList<>();
		for(int i=0;i<word.length();i++) {
			if(word.charAt(i)==current) {
				positions.add(i);
			}
		}
		return positions;
	}
	
	public static boolean present(String givenWord) throws IOException {
		char current = givenWord.charAt(0);
		String path = new String();
		boolean result=false;
		//System.out.println(current);
		switch (current) {
		case 'a':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\A words.txt";
			InputStream isa = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isa, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(givenWord+" "+s);
	                	result=true;
	                	//System.out.println(result);
	                	break;
	                }
	            }
	        }
		case 'b':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\B words.txt";
			InputStream isb = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isb, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'c':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\C words.txt";
			InputStream isc = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isc, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'd':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\D words.txt";
			InputStream isd = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isd, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'e':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\E words.txt";
			InputStream ise = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 ise, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'f':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\F words.txt";
			InputStream isf = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isf, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'g':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\G words.txt";
			InputStream isg = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isg, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'h':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\H words.txt";
			InputStream ish = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 ish, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'i':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\I words.txt";
			InputStream isi = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isi, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'j':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\J words.txt";
			InputStream isj = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isj, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'k':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\K words.txt";
			InputStream isk = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isk, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'l':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\L words.txt";
			InputStream isl = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isl, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'm':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\M words.txt";
			InputStream ism = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 ism, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'n':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\N words.txt";
			InputStream isn = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isn, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'o':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\O words.txt";
			InputStream iso = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 iso, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'p':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\P words.txt";
			InputStream isp = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isp, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'q':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\Q words.txt";
			InputStream isq = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isq, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'r':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\R words.txt";
			InputStream isr = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isr, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 's':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\S words.txt";
			InputStream iss = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 iss, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 't':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\T words.txt";
			InputStream ist = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 ist, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'u':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\U words.txt";
			InputStream isu = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isu, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'v':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\V words.txt";
			InputStream isv = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isv, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'w':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\W words.txt";
			InputStream isw = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isw, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'x':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\X words.txt";
			InputStream isx = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isx, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'y':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\Y words.txt";
			InputStream isy = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isy, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		case 'z':
			path = "C:\\Users\\shika\\OneDrive\\Desktop\\Dataset\\Z words.txt";
			InputStream isz = new FileInputStream(path);
	        try (Scanner sc = new Scanner(
	                 isz, StandardCharsets.UTF_8.name())) {
	            while (sc.hasNext()) {
	                String s = sc.next();
	                s = s.toLowerCase();
	                if(givenWord.equals(s)) {
	                	//System.out.println(result);
	                	result=true;
	                	break;
	                }
	            }
	        }
		}
		//System.out.println(result);
		return result;
	}
}

