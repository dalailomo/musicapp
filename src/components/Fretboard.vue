<template>
  <div>
    <p>
      Root: <select @input="onRootSelect"  v-model="scaleRoot"><option v-for="noteTag in noteTags" :key="noteTag">{{ noteTag }}</option></select>
    </p>
    <p>
      Pattern: {{ scalePattern }}</p>
    <h3>Standard {{ base }}</h3>
    <div class="fretboard">
      <String :notes="notes(noteTags.indexOf(base) + 24)" stringPrefix="1st" :scale="scale" />
      <String :notes="notes(noteTags.indexOf(base) + 19)" stringPrefix="2nd" :scale="scale" />
      <String :notes="notes(noteTags.indexOf(base) + 15)" stringPrefix="3th" :scale="scale" />
      <String :notes="notes(noteTags.indexOf(base) + 10)" stringPrefix="4th" :scale="scale" />
      <String :notes="notes(noteTags.indexOf(base) + 5)" stringPrefix="5th" :scale="scale" />
      <String :notes="notes(noteTags.indexOf(base))" stringPrefix="6th" :scale="scale" />
    </div>
    <div class="fretMarkers">
      <div class="fretMarker" v-for="(fret) in totalFrets" :key="`fret-${fret}`">
        <span v-if="hasFretMark(fret)">{{fret - 1}}</span>
      </div>
    </div>
  </div>
</template>

<style>
.fretboard {
  display: flex;
  flex-direction: column;
  font-family: 'Courier New', Courier, monospace;
  outline: 1px solid #d3d3d3;
}

.fretboard .string {
  display: flex;
}

.fretboard .string .note .noteDetail {
  width: 30px;
  height: 30px;
  display: flex;
  line-height: 30px;
  justify-content: center;
  background: transparent;
  border-radius: 100%;
  margin: 0 10px;
  z-index: 2;
  position: relative;
  box-sizing: border-box;
}

.fretboard .string .note .noteDetail.highlight {
  background: #e8e8e8;
}

.fretboard .string .note .noteDetail.highlight.root {
  background: rgb(230, 185, 200);
}

.fretboard .string .note .noteDetail.highlight.third {
  border: 1px solid  green;
}

.fretboard .string .note .noteDetail.highlight.fifth {
  border: 1px solid  deeppink;
}

.fretboard .string .note .noteDetail.highlight.sept {
  border: 1px solid  blue;
}

.fretboard .string .note .fretBarHorizontal {
  border-top: 1px solid #d3d3d3;
  display: block;
  top: -15px;
  position: relative;
  z-index: 1;
}

.fretboard .string .note .fretBarVertical {
  border-right: 1px solid #d3d3d3;
  display: block;
  height: 30px;
  margin-top: -30px;

  position: relative;
  z-index: 1;
}

.fretMarkers {
  display: flex;
  font-family: 'Courier New', Courier, monospace;
}

.fretMarkers .fretMarker {
  width: 30px;
  min-width: 30px;
  height: 30px;
  display: flex;
  line-height: 30px;
  justify-content: center;
  border-radius: 100%;
  margin: 0 10px;
}

.fretMarkers .fretMarker > span {
  width: 30px;
  display: block;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import String from './String.vue';

@Component({
  components: {
    String
  }
})
export default class HelloWorld extends Vue {
  base: string = 'E';

  scalePattern = ['W', 'W', 'H', 'W', 'W', 'W', 'H'];
  // scalePattern = ['W', 'H', 'W', 'W', 'W', 'H', 'W'];
  // scalePattern = ['W', 'H', '+', 'H', 'H', '+', 'H'];
  scaleRoot = 'E';

  get scale(): any[] {
    return this.scaleFromPattern(this.scalePattern, this.scaleRoot);
  }
  totalFrets: number = 22;

  onRootSelect(e: string) {
    this.scaleRoot = (e as any).target.value;
  }

  noteTags: string[] = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ]

  scaleFromPattern(scalePattern: any[], baseNote: string): any[] {
    let currentStep = this.noteTags.indexOf(baseNote);
    const result: any[] = [];

    for (const scalePatternItem of scalePattern) {
      if (currentStep >= this.noteTags.length) {
        // console.log(currentStep, currentStep - (this.noteTags.length));
        currentStep = currentStep - (this.noteTags.length);
      }

      result.push(this.noteTags[currentStep]);

      currentStep++;

      if (scalePatternItem === 'W') {
        currentStep++;
      }

      if (scalePatternItem === '+') {
        currentStep++;
        currentStep++;
      }
    }

    return result;
  }

  hasFretMark(fret: number): boolean {
    const fretOffseted = fret + 1;

    return (
        fretOffseted === 1
        || fretOffseted === 3
        || fretOffseted === 5
        || fretOffseted === 7
        || fretOffseted === 9
        || fretOffseted === 11
        || fretOffseted === 14
        || fretOffseted === 16
        || fretOffseted === 18
        || fretOffseted === 20
      )
  }

  notes(initialNote: number): any[] {
    const result: any[] = [];
    const totalNotes = this.noteTags.length;

    let currentFret = 0;
    let currentNote = initialNote;

    const sanitizeNote = (note: number, limit: number): number => {
      if (note < limit) return note;

      const sanitizedNote = note - limit;

      if (sanitizedNote >= limit) return sanitizeNote(sanitizedNote, limit);

      if (sanitizedNote < limit) return sanitizedNote;

      return sanitizeNote(sanitizedNote, limit) - limit;
    }

    while(currentFret < this.totalFrets) {
      currentNote = sanitizeNote(currentNote, totalNotes);

      result.push(this.noteTags[currentNote]);

      currentFret++;
      currentNote++;
    }

    return result;
  }
}
</script>
