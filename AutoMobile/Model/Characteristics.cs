using System;

namespace Model
{
    public class CharacteristicItem
    {
        public bool Has { get; private set; }
        public string Title { get; private set; }
        public CharacteristicItem(bool h, string t)
        {
            Has = h;
            Title = t;
        }
    }
    public class Characteristics
    {
        private readonly CharacteristicItem[] _characterist = new CharacteristicItem[7];
        public int Length { get { return _characterist.Length; } }
        public CharacteristicItem[] Charact
        {
            get { return _characterist; }
        }
        public Characteristics(bool hasConditionAir, bool hasAssistedDirection, bool hasElectricGlass,
            bool hasElectricClose, bool hasSoundSystem, bool hasAutomaticBox, bool has4WheelsTraction)
        {
            _characterist[0] = new CharacteristicItem(hasConditionAir,"Ar condicionado");
            _characterist[1] = new CharacteristicItem(hasAssistedDirection,"Direcção Assistida");
            _characterist[2] = new CharacteristicItem(hasElectricGlass,"Vidro elétrico");
            _characterist[3] = new CharacteristicItem(hasElectricClose,"Fecho elétrico");
            _characterist[4] = new CharacteristicItem(hasSoundSystem,"Sistema de som");
            _characterist[5] = new CharacteristicItem(hasAutomaticBox,"Caixa Automática");
            _characterist[6] = new CharacteristicItem(has4WheelsTraction,"Tracção às 4 rodas");
             
        }

        public Characteristics(bool[] c)
        {
            if (c.Length != _characterist.Length) throw new ArgumentException("Characteristics with incorrect length");
            _characterist[0] = new CharacteristicItem(c[0], "Ar condicionado");
            _characterist[1] = new CharacteristicItem(c[1], "Direcção Assistida");
            _characterist[2] = new CharacteristicItem(c[2], "Vidro elétrico");
            _characterist[3] = new CharacteristicItem(c[3], "Fecho elétrico");
            _characterist[4] = new CharacteristicItem(c[4], "Sistema de som");
            _characterist[5] = new CharacteristicItem(c[5], "Caixa Automática");
            _characterist[6] = new CharacteristicItem(c[6], "Tracção às 4 rodas");
        }

        public CharacteristicItem GetElement(int idx)
        {
            if (idx >= 0 && idx < Length) return _characterist[idx];
            return null;
        }

        
    }
}