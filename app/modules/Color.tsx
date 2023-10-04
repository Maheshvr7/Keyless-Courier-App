

class Color {


  get black() {
    return '#000000';
  }

  get orange() {
    return '#FFA500';
  }

  get green() {
    return '#008000';
  }

  get yellow() {
    return '#FFFF00';
  }

  get gold() {
    return '#CFB53B';
  }

  get red() {
    return '#FF0000';
  }

  get grey() {
    return '#808080'
  }

  get white() {
    return '#FFFFFF';
  }

  get blue() {
    return "#0000FF"
  }

  get transparent() {
    return "#d4d1cb"
  }

  get lightGrey(): string {
    return "#AFAFAF"
  }

  get lightBlue(): string {
    return "#00B1FF"
  }

  get darkWhite(): string {
    return "#EBEBEB"
  }

  get cardShadow(): string {
    return "rgba(0,0,0,0.8)"
  }

}

const color = new Color()
export default color
