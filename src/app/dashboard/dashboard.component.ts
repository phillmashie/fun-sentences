import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { WordService } from '../word.service';
import { catchError } from 'rxjs/operators';

interface WordType {
  id: number;
  name: string;
}

interface Sentence {
  id: number;
  sentence: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userProfile: any;
  avatarUrl: string = '';
  wordTypes: WordType[] = [];
  selectedWords: { [key: string]: string } = {};
  sentence: string = '';
  sentences: any[] = [];

  constructor(
    private wordService: WordService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fetchWordTypes();
    this.getSentences();
    this.getUserProfile();
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        this.userProfile = response;
        this.generateAvatarUrl();
      },
      (error: any) => {
        console.error('Failed to retrieve user profile', error);
      }
    );
  }

  generateAvatarUrl() {
    // Use a random identifier for the avatar from 1 to 1000
    const randomId = Math.floor(Math.random() * 1000) + 1;
    this.avatarUrl = `https://robohash.org/${randomId}?set=set2&size=150x150`;
  }

  getSentences() {
    this.wordService.getSentences().subscribe(
      (sentences: string[]) => {
        // Change the type to string[]
        this.sentences = sentences;
      },
      (error: any) => {
        console.error('Error retrieving sentences:', error);
      }
    );
  }

  fetchWordTypes() {
    this.wordService.getWordTypes().subscribe((wordTypes: WordType[]) => {
      this.wordTypes = wordTypes;
    });
  }

  getWordsByType(wordType: string): Observable<string[]> {
    return this.wordService.getWordsByType(wordType);
  }

  getPreviewSentence(): string {
    const sentenceParts = Object.keys(this.selectedWords)
      .filter((wordType) => this.selectedWords[wordType])
      .map((wordType) => this.selectedWords[wordType]);
    return sentenceParts.join(' ');
  }

  selectWord(wordType: WordType) {
    this.getWordsByType(wordType.name).subscribe((wordsByType: any[]) => {
      const randomIndex = Math.floor(Math.random() * wordsByType.length);
      const selectedWord = wordsByType[randomIndex].word; // Extract the 'word' property
      this.selectedWords[wordType.name] = selectedWord;
    });
  }

  addWordToSentence() {
    const previewSentence = this.getPreviewSentence();
    if (previewSentence) {
      this.sentence = previewSentence;
    }
  }

  submitSentence() {
    // Check if there is a sentence to submit
    if (this.sentence) {
      // Call the submitSentence() method of the WordService to send the sentence to the backend
      this.wordService.submitSentence(this.sentence).subscribe(
        (response) => {
          // Handle the response from the backend if needed
          console.log('Sentence submitted successfully:', response);
        },
        (error) => {
          // Handle the error if the submission fails
          console.error('Error submitting sentence:', error);
        }
      );
    }

    // Reset the selectedWords and sentence
    this.selectedWords = {};
    this.sentence = '';
  }
}
