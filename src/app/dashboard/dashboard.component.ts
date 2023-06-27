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

interface UserProfile {
  id: number;
  username: string;
  fullName: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userProfile: UserProfile | null = null;
  avatarUrl: string = '';
  wordTypes: WordType[] = [];
  selectedWords: { [key: string]: string } = {};
  sentence: string = '';
  sentences: string[] = [];

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
        if (response.status === 1) {
          this.userProfile = response.data;
          this.generateAvatarUrl();
        } else {
          console.error('Failed to retrieve user profile:', response.message);
        }
      },
      (error: any) => {
        console.error('Error retrieving user profile:', error);
      }
    );
  }

  generateAvatarUrl() {
    if (this.userProfile) {
      // Use the username as the identifier for the avatar
      const username = this.userProfile.username;
      this.avatarUrl = `https://robohash.org/${username}?set=set2&size=150x150`;
    }
  }

  getSentences() {
    this.wordService.getSentences().subscribe(
      (sentences: string[]) => {
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
      const selectedWord = wordsByType[randomIndex].word;
      this.selectedWords[wordType.name] = selectedWord;
    });
  }

  removeWord(wordType: WordType) {
    delete this.selectedWords[wordType.name];
  }

  addWordToSentence() {
    const previewSentence = this.getPreviewSentence();
    if (previewSentence) {
      this.sentence = previewSentence;
    }
  }

  submitSentence() {
    if (this.sentence) {
      this.wordService.submitSentence(this.sentence).subscribe(
        (response) => {
          console.log('Sentence submitted successfully:', response);
        },
        (error) => {
          console.error('Error submitting sentence:', error);
        }
      );
    }

    this.selectedWords = {};
    this.sentence = '';
  }
}
